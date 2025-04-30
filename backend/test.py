import os, sys                      # E401 - 한 줄에 둘 이상 import
import json                         # F401 - 사용되지 않음

def foo(a,b):                       # E231 - 쉼표 뒤 공백 없음
    print("bad indent")                # E111 - 1칸 들여쓰기
    if(a==b): print("same")            # E701 - 한 줄에 여러 문
    else:
        print("different");print("x")     # E702 - ; 두 문장, E111
    really_long = "🐍" * 120  # E501 - 100자 초과