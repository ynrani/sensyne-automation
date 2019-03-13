@observation @smoke @regression
Feature: Observation
  As a clinical staff
  I want to capture the observations
  So that it is stored for future reference
  
 @majd
 Scenario: Capture Observations
    Given I am on chart
    Then Below observations should be displayed on the side
      | Time            |
      | Temperature     |
      | Blood pressure  |
      | Heart rate      |
      | Respiratory rate|
      | O2 saturation   |
      | O2 therapy      |
      | Consciousness   |
      | Clinical concern|
  
  @majd
  Scenario: Raise Observations errors
    Given I am on chart
    Then A warning should be displayed for entering the below observations incorrectly
      | Time            |
      | Temperature     |
      | Blood pressure  |
      | Heart rate      |
      | Respiratory rate|
      | O2 saturation   |
      | O2 therapy      |
