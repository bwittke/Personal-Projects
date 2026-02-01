# APR Interest Payment Calculator #

def interest_payment(card_balance, apr_rate, bill_cycle_length): # formula to calculate interest payment
    apr_rate_decimal = apr_rate / 100
    daily_apr_rate = apr_rate_decimal / 365
    cycle_apr_rate = daily_apr_rate * bill_cycle_length
    payment = cycle_apr_rate * card_balance
    return payment

def main():
    print("APR Interest Payment Calculator")
    cardbalance = float(input("\nWhat is the outstanding balance on your credit card? (i.e. 5663.23)\n"))
    apr = float(input("\nWhat is the interest rate on your card? (i.e. 23.5)\n"))
    billcycle = int(input("\nWhat is the length in days of your billing cycle? (i.e. 30)\n"))

    interest_calc = interest_payment(cardbalance, apr, billcycle)
    interest = round(interest_calc, 2)

    print(f"\nYour estimated interest payment for this billing cycle is ${interest}.\n")


main()