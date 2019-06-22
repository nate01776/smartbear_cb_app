Feature: Bitcoin Price Index


  @MVP-Release @data-streaming
  Scenario: Default display on home page
    As a bitcoin trader, I need to quickly see historical price data for one bitcoin so that I can make decisions on my portfolio
    When I first launch the application
    Then I should see a chart showing the price of Bitcoin at end of each day for the last month

  Scenario Outline: Change the currency being displayed (<hiptest-uid>)
    By default, the chart displays the price of a single bitcoin in USD, but as an international trader, I want to view the value of bitcoin in other currencies
    Given I have navigated to the application
    When I change the currency to "<currency>"
    Then my chart will update to show the price of one bitcoin in "<currency>"

    Examples:
      | currency | hiptest-uid |
      | CAD |  |
      | USD |  |
      | GBP |  |
