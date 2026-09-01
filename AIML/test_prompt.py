from rag.prompt import build_prompt

context = """
Network Address Translation (NAT) maps private IP addresses
to public IP addresses so devices can communicate over the Internet.
"""

question = "How does NAT work?"

prompt = build_prompt(question, context)

print(prompt)