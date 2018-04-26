---
order: 30
title: Creating alarms from bit measurements
layout: redirect
---

Devices often keep alarm statuses in registers and cannot interpret the meaning of alarms. In this example, we assume that a device just sends the entire register as a binary value in a measurement. A rule must identify the bits and create the respective alarm.

We create three dictionaries to map alarm text, type, and severity for each of the bits, and an action to look up the value. We use -1 to indicate a default value, and replace &#60;position> with the string form of the position.

	monitor CreateAlarmFromBinary {
		dictionary&#60;integer, string> positionToAlarmType := {
			0: "c8y_HighTemperatureAlarm",
			1: "c8y_ProcessingAlarm",
			2: "c8y_DoorOpenAlarm",
			3: "c8y_SystemFailureAlarm",
			-1:"c8y_FaultRegister&#60;position>Alaram"
		};
	
	dictionary&#60;integer, string> positionToAlarmSeverity := {
		0: "MAJOR",
		1: "WARNING",
		2: "MINOR",
		3: "CRITICAL",
		-1:"MAJOR"
	};
	dictionary&#60;integer, string> positionToAlarmText := {
		0: "The machine temperature reached a critical status",
		1: "There was an error trying to process data",
		2: "Door was opened",
		3: "There was a critical system failure",
		-1:"An undefined alarm was reported on position &#60;position> in the binary fault register"
	};

	action getText(integer bitPosition, dictionary<integer, string> lookup) returns string {
		string template := lookup.getOr(bitPosition, lookup[-1]);
		return template.replaceAll("&#60;position>", bitPosition.toString());
	}

To analyze the binary measurement value, we will interpret it as a string value and loop through each character. The getActiveBits() function will do that and return a list of the bit positions at where the measurement had a "1". We can then use a `for` loop to iterate through that:

	action getBitPositions(string binaryAsText) returns sequence&#60;integer> {
			sequence&#60;integer> bitsSet:=new sequence&#60;integer>;
			integer i:=0;
			while(i < binaryAsText.length()) {
				string character := binaryAsText.substring(i, i+1);
				if character = "1" {
					bitsSet.append(binaryAsText.length() - i - 1);
				}
				i:=i+1;
			}
			return bitsSet;
		}
	
	action onload() {
		on all Measurement(type = "c8y_BinaryFaultRegister") as m {
			string faultRegister := m.measurements.getOrDefault("c8y_BinaryFaultRegister")
				.getOrDefault("errors").value.toString();
			integer bitPosition;
			for bitPosition in getBitPositions(faultRegister) {
				Alarm alarm := new Alarm;
				alarm.type := getText(bitPosition, positionToAlarmType);
				alarm.severity := getText(bitPosition, positionToAlarmSeverity);
				alarm.status := "ACTIVE";
				alarm.source := m.source;
				alarm.time := m.time;
				alarm.text := getText(bitPosition, positionToAlarmText);
				send alarm to Event.CHANNEL;
			}
		}
	}
}

Creating a measurement like this

    {
        "c8y_BinaryFaultRegister": { "errors": { "value": 10110 } },
      "time":"...",
      "source": { "id":"..." },
      "type": "c8y_BinaryFaultRegister" }

will trigger the last statement three times.

*   measurement at bit position 1 - c8y_ProcessingAlarm, WARNING, "There was an errror trying to process data"
*   measurement and bit position 2 - c8y_DoorOpenAlarm, MINOR, "Door was opened"
*   measurement and bit position 4 - c8y_FaultRegister4Alarm, MAJOR, "An undefined alarm was reported on position 4 in the binary fault register"

and therefore create three alarms.

## Consumption measurements

Assuming we have a sensor which measures the current fill level of something and sends the values on a regular basis to Cumulocity we can easily create additional consumption values. Calculating the absolute difference between two measurements can be useful but it will only give you a clear view if the measurements are sent always in the same interval. Therefore, we will put the absolute difference in relation to the time difference and calculate as a per hour consumption.

We will compare the value and time difference of two adjacent measurements for a device, using a stream retaining 2 entries, and selecting the first and last timestamp and value.
	
	using com.apama.aggregates.last;
	using com.apama.aggregates.first;
	using com.apama.aggregates.count;
	
	
	monitor FillLevelMeasurements {
	    event FillLevel {
	        float firstValue;
	        float firstTime;
	        float lastValue;
	        float lastTime;
	        string source;
	    }
	    action calculateConsumption(FillLevel l) returns float {
	        if(l.firstTime = l.lastTime) {
	            return 0.0;
	        } else {
	            return ((l.lastValue - l.firstValue) * 3600.0) / (l.lastTime - l.firstTime);
	        }
	    }
	    action onload() {
	        from m in all Measurement(type = "c8y_WaterTankFillLevel") partition by m.source retain 2 group by m.source
	            having count() = 2
	            select FillLevel(first(m.measurements["c8y_WaterTankFillLevel"]["level"].value), first(m.time),
	                             last(m.measurements["c8y_WaterTankFillLevel"]["level"].value), last(m.time), m.source) as fill {
	                MeasurementValue mv := new MeasurementValue;
	                mv.value := calculateConsumption(fill);
	                mv.unit := "l/h";
	                Measurement m := new Measurement;
	                m.type := "c8y_HourlyWaterConsumption";
	                m.measurements[m.type] := {"consumption":mv};
	                m.time := currentTime;
	                m.source := fill.source;
	                send m to Measurement.CREATE_CHANNEL;
	        }
	    }
	}
	
		