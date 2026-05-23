# Write into file

text = input("Enter text: ")

file = open("output.txt", "w")

file.write(text)

file.close()

print("Data written successfully")
