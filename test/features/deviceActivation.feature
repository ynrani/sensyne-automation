@activation
Feature: Device activation
  As a user
  I want to activate the device
  So that I can use a device in hospital


  @smoke @regression
  Scenario: Successful device activation
    Given I am on device activation page
    When I enter device activation code
    Then I should be redirected to clinical scan page
