# Maximum of two numbers using function

def maximum(a, b):

    if a > b:
        return a
    return b


num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

print("Maximum =", maximum(num1, num2))
