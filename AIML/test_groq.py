from models.groq_client import ask_groq

response = ask_groq(
    "Explain Network Address Translation in 2 lines."
)

print(response)