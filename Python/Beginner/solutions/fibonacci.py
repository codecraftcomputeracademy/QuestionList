# Fibonacci series program

n = int(input("Enter number of terms: "))

first = 0
second = 1

for i in range(n):
    print(first)
    next_number = first + second
    first = second
    second = next_number
