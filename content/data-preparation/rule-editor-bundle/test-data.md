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

### To create a test {#creating-a-test}

1. In the rule editor, locate the **Test data** panel.
2. Add a representative payload to the **Input** section. The **Input** section currently supports only JSON payloads.

The test is now associated with the current rule.

#### To create additional tests {#creating-additional-tests}

1. Click the test name dropdown at the top of the test data panel.
2. Select **Create new test**.
3. Enter a name for the test.
4. Enter a payload in the **Input** field for the new test.

Each test is independent and runs separately against the smart function. Create a test for every distinct message format, edge case, or error scenario you want to validate.

#### To add multiple messages to a test {#adding-multiple-messages}

A single test can contain more than one message. This is useful for grouping related test cases or when you want to simulate a batch of device messages.

1. Click the menu icon in the test data panel.
2. Select **Add message to this test**.
3. Enter the additional payload.

#### Managing tests {#managing-tests}

Click the test name dropdown. From within the dropdown, you can:

- **Duplicate** the current test: Click the **Duplicate test** button. Enter a name for the new test.
- **Rename** a test: Click the rename icon next to the test. Enter a new name for the test and confirm.
- **Delete** a test: Click the delete icon next to the test.


### Generating tests with the AI assistant {#generating-tests-with-ai}

The AI assistant helps you expand test coverage quickly, especially for edge cases you have not considered.

1. Ask the AI assistant to create test cases for you.
2. The AI assistant adds new tests with relevant sample payloads.
3. Review the payloads and save expected outputs so they serve as regression checks in future test runs.

To protect your test suite, the AI assistant cannot delete tests.

### To run tests {#running-tests}

- Click **Run tests**.

The platform compiles and executes your smart function against every test input.

#### Inspecting outputs {#inspecting-outputs}

The **Outputs** section displays the results for each test after a test run. Each test produces its own output, so you can review results individually. The output includes:

- **Function return values** — the {{< product-c8y-iot >}} objects (measurements, events, alarms, and operations) that the smart function produces for each test message.
- **Log messages** — any log output from the smart function. Log messages appear below the function return values in the output section.
- **Errors and exceptions** — if the smart function throws an error or encounters an exception during execution, the error message and stack trace (if available) appear in the output section for that test.

Review the output carefully to confirm that the smart function produces the correct {{< product-c8y-iot >}} objects and does not create any unexpected errors.

#### Detecting failures {#detecting-failures}

If one or more tests are failing:

- An error icon appears next to the test name dropdown.
- Within the dropdown, An error icon appears next to the specific tests that are failing.

### Expected output {#expected-output}

Save the output of a test as the **expected output** to create a baseline. If a future code change causes the output to differ from the saved expectation, the test is marked as failing.

#### To save an expected output {#saving-expected-output}

1. Run the tests to produce output.
2. Review the output and confirm it is correct.
3. Click the menu icon in the output section.
4. Click **Save**.

The current output is now stored as the expected output for that test.

#### Detecting regressions {#detecting-regressions}

After you save expected outputs, every subsequent test run compares the actual output against the saved expectation. If the output no longer matches:

- An error icon appears next to the test name dropdown.
- Within the dropdown, An error icon appears next to the specific tests that are failing.
- A comparison between the **Actual output** and **Expected output** is displayed. This helps to identify which part of the output has changed.

Run the tests after each change to your smart function and check for regressions against your saved expected outputs.

### To fix failing tests {#fixing-failing-tests}

If one or more tests are failing, An error icon appears next to the test name dropdown. To fix the code automatically:

1. Click **Fix smart function**.
2. The AI assistant analyzes the failing tests and updates the smart function so that all tests pass.
3. Run the tests again to verify the fix.

Review the AI's changes before deploying. The AI adjusts the code to match your expected outputs, so confirm that the changes are correct for all scenarios, not only the failing tests.
