# Prime number checker using function

def is_prime(num):

    if num < 2:
        return False

    for i in range(2, num):
        if num % i == 0:
            return False

    return True


number = int(input("Enter a number: "))

if is_prime(number):
    print("Prime Number")
else:
    print("Not Prime Number")
