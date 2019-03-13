@login
Feature: Login to the Send
  As a user
  I want to login
  So that I can navigate to the site


  @smoke @regression
  Scenario Outline: Successful login and logout for IT Admin and Patient Manager
    Given I am logged in as <userType> user
    And I should be logged in on Dashboard page
    When I logout over logout button
    Then I should be redirected to login page

    Examples:
      | userType        |
      | IT Admin        |
      | Patient Manager |


  @smoke @regression
  Scenario: Successful login and logout for Midwife
    Given I am logged in as Midwife user
    And I should be logged in on Sensyne Hub page
    When I logout over logout link
    Then I should be redirected to login page

