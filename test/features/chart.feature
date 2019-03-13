@chart
Feature: Load Chart
  As a clinical staff
  I want to check the chart of the patient
  So that I can review his/her condition


  @smoke @regression
  Scenario: Load Chart
    Given I am on logged in as Midwife to Send Entry
    And  I scan my barcode
    When I scan patient wristband
    Then I confirm patient
    And the chart should be loaded
