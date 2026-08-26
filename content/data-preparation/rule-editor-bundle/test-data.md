---
weight: 10
title: Test data
layout: bundle
outputs:
  - html
  - json
sector:
  - device_management
---

Use the **Test data** panel in the [rule editor](/data-preparation/rule-editor/) to verify that your smart function produces the correct {{< product-c8y-iot >}} objects before you deploy a rule to live traffic. Every change to a smart function has the potential to introduce unexpected behavior. A comprehensive set of tests gives you confidence that:

- The function handles all the message formats your devices send.
- Edge cases such as missing fields, unexpected types, or empty payloads are handled gracefully.
- Later code changes do not break previously working behavior (regression detection).

Build a thorough set of test cases to catch errors early, validate edge cases, and detect regressions when the smart function changes.

### To configure your first test {#creating-a-test}

1. In the rule editor, locate the **Test data** panel.
2. Add a typical device payload to the **Input** section.

The test is now associated with the current rule.

Each input message displays the following properties as chips below the payload editor:

- **Payload type** — the format for displaying and editing the message payload (for example, JSON).
- **Time** — the timestamp indicating when the transport received the message.
- **Client ID** — the client (typically a device identifier or device gateway) that sent the message.
- **Topic** — the MQTT topic the message was published to.

To edit these properties, click the edit icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> next to the chips. 

#### Editing binary payloads {#editing-binary-payloads}

Set the **Payload type** to a binary format when your device messages contain raw binary data. This opens a hex editor instead of the text editor. The hex editor displays the payload as hexadecimal byte values alongside an ASCII representation, and supports the following:

- **Insert and replace mode** — Toggle between modes using the toolbar switch or by pressing **Insert**.
  - In **Replace** mode (the default), typing overwrites the byte under the cursor, and typing at or past the last byte appends a new byte. Use Replace mode for fixed-length payload fields, to preserve strict byte offsets.
  - In **Insert** mode, typing shifts the following bytes to the right. This applies to both typed input and pasted content. Use Insert mode only for variable-length structures, such as type-length-value fields or strings — and remember to adjust any total-length fields and checksums afterward.
- **Extending the payload** — Click an empty cell past the end of the payload, or start typing while nothing is selected, to append zero-filled bytes automatically, without needing a separate "add byte" action.
- **Copy and paste** — Copying from the hex panel copies the selection as hex text (for example, `DE AD BE EF`). Copying from the ASCII panel copies the equivalent raw ASCII text instead. When pasting, the clipboard content is parsed according to whichever panel currently has focus.
- **Find** — Press **Ctrl+F** to search the payload. Use the ASCII/Hex switch in the find widget to choose whether you're searching for a byte sequence or an ASCII text sequence. Overlapping occurrences are all reported as separate matches, for example searching for `AA` within `AAA` returns two matches.
- **Undo and redo** — Use the standard undo and redo shortcuts to step backward and forward through your edits, up to the last 100 changes.
- **Upload and download** — Use the toolbar's upload and download options to load a binary file as the payload, or save the current payload to a file.

#### To create additional tests {#creating-additional-tests}

We recommend creating additional tests to check for edge cases such as missing values, out of range values, and other inputs that might require special handling in your rule. To do this, open the tests drop-down, and duplicate the existing test to a new one that describes what it's for. You can also generate tests using the AI assistant. For any edge cases where it's not possible to generate a valid {{< product-c8y-iot >}} object, raise a Javascript exception so that an alarm will be created to notify you about the problem. 

1. Click the test name dropdown at the top of the test data panel.
2. Select an existing test to use as a starting point and click **Duplicate test**. 
3. Enter a short name describing what the new test covers, for example "Null values", "Out-of-range values", "Device protocol v2".
4. Edit the **Input** payload for the case you wish to test, for example, missing values, different field types, or out-of-range values.

Each test is independent and runs separately against the smart function. Create a test for every distinct message format, edge case, or error scenario you want to validate.

#### To add multiple messages to a test {#adding-multiple-messages}

A single test can contain more than one message. This is useful when you want to simulate a batch of device messages.

You can also add multiple messages to group related test cases and avoid having a large number of separate tests. However, note that when you run the tests, the outputs panel will show a list of *all* outputs generated by *all* inputs of a given test. So we recommend using separate tests instead of multiple inputs per test if you need to distinguish which output came from each input. 

To add additional messages to a single test:

1. Click the menu icon <i class="dlt-c8y-icon-ellipsis-v text-primary icon-20"></i> in the test data panel.
2. Select **Add message to this test**.
3. Enter the additional payload.

#### To manage tests {#managing-tests}

Click the test name dropdown. From within the dropdown, you can:

- **Duplicate** the current test: Click <i class="dlt-c8y-icon-duplicate text-primary icon-20"></i> **Duplicate test**. Enter a name for the new test.
- **Create a new test**: Click <i class="dlt-c8y-icon-plus-circle text-primary icon-20"></i> **Create new test** to create a new empty test. 
- **Rename** a test: Click the rename icon <i class="dlt-c8y-icon-edit1 text-primary icon-20"></i> next to the test. Enter a new name for the test and confirm.
- **Delete** a test: Click the delete icon <i class="dlt-c8y-icon-minus-circle text-primary icon-20"></i> next to the test.

### Generating tests with the AI assistant {#generating-tests-with-ai}

The AI assistant helps you expand test coverage quickly, especially for edge cases you have not considered.

1. Ask the AI assistant to create test cases for you.
2. The AI assistant adds new tests with relevant sample payloads.
3. Review the payloads and save expected outputs so they serve as regression checks in future test runs.

To protect your test suite, the AI assistant cannot delete tests.

### To run tests {#running-tests}

- Click <i class="dlt-c8y-icon-play-arrow text-primary icon-20"></i> **Run tests**.

The platform executes your smart function against every test input. The outputs from each invocation of the smart function are displayed for you to inspect, but are not sent to the platform itself. 

#### To inspect outputs {#inspecting-outputs}

The **Outputs** section displays the results for each test after a test run. Each test produces its own output, so you can review results individually. The output includes:

- **Function return values** — the {{< product-c8y-iot >}} objects (measurements, events, alarms, and operations) that the smart function produces for each test message. Each one also identifies the {{< product-c8y-iot >}} external "source" device they would be created on. 
- **Log messages** — any log output from the smart function. Log messages appear below the function return values in the output section.
- **Errors and exceptions** — if the smart function throws an error or encounters an exception during execution, the error message and stack trace (if available) appear in the output section for that test.

Review the output carefully to confirm that the smart function produces the correct {{< product-c8y-iot >}} objects and does not create any unexpected errors.

#### To detect failures {#detecting-failures}

If one or more tests cannot be executed or raise a Javascript exception:

- An error icon appears next to the test name dropdown.
- Within the dropdown, an error icon appears next to the specific tests that are failing.

It is good practice to make your smart function throw an exception for any cases the smart function cannot correctly handle instead of just dropping the message. This creates an alarm notification including information about the message that caused the problem. This can be very helpful for debugging problems and you can use the information in the alarm to add a new test if you want to improve your smart function. 

### Expected output {#expected-output}

Once you have verified that the smart function is producing the correct output, save the output of your test as the **expected output** to create a baseline. If a future code change causes the output to differ from the saved expectation, the test is marked as failing, and the differences are displayed. This provides automated regression checking and is much less effort than checking manually. 

To ensure the expected output can be compared, avoid using the current time (`new Date()`) in your smart functions. Instead use the `msg.time` from the input message, which remains stable each time the test is executed. 

#### To save or update the expected output {#save-expected-output}

1. Run the tests to produce output.
2. Review the output and confirm it is correct.
3. Click the menu icon <i class="dlt-c8y-icon-ellipsis-v text-primary icon-20"></i> in the output section.
4. Under **EXPECTED OUTPUT** click **Save**.

The current output is now stored as the expected output for that test.

#### To detect regressions {#detecting-regressions}

After you save expected outputs, every subsequent test run compares the actual output against the saved expectation. If the output no longer matches:

- An error icon appears next to the test name dropdown.
- Within the dropdown, an error icon appears next to the specific tests that are failing.
- A comparison between the **Actual output** and **Expected output** is displayed. This helps to identify which part of the output has changed.

Run the tests after each change to your smart function and check for regressions against your saved expected outputs.

### To fix failing tests {#fixing-failing-tests}

If one or more tests are failing, an error icon appears next to the test name dropdown. 

If you saved an expected output which no longer matches, check whether the new output is correct. If it is, [save the new expected output](#save-expected-output). If the output is not correct, you can ask the AI to help fix the code automatically:

1. Click **Fix smart function**.
2. The AI assistant analyzes the failing tests and updates the smart function so that all tests pass.
3. Run the tests again to verify the fix.

Review the AI's changes before deploying. The AI adjusts the code to match your expected outputs, so confirm that the changes are correct for all scenarios, not only the failing tests.
