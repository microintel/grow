#include <stdio.h>
#include <ctype.h>  // for isalnum()
#include <string.h>

#define MAX 100

// Stack implementation
char stack[MAX];
int top = -1;

void push(char c) {
    if (top == MAX - 1) {
        printf("Stack Overflow\n");
    } else {
        stack[++top] = c;
    }
}

char pop() {
    if (top == -1) {
        return -1;  // empty stack
    } else {
        return stack[top--];
    }
}

char peek() {
    if (top == -1) return -1;
    return stack[top];
}

// Function to return precedence of operators
int precedence(char op) {
    switch (op) {
        case '^': return 3;
        case '*':
        case '/': return 2;
        case '+':
        case '-': return 1;
        default: return 0;
    }
}

// Function to convert infix to postfix
void infixToPostfix(char infix[]) {
    char postfix[MAX];
    int i, k = 0;
    char ch;

    for (i = 0; infix[i] != '\0'; i++) {
        ch = infix[i];

        if (isalnum(ch)) {  // operand → directly to output
            postfix[k++] = ch;
        }
        else if (ch == '(') {
            push(ch);
        }
        else if (ch == ')') {
            while (peek() != '(' && top != -1) {
                postfix[k++] = pop();
            }
            pop();  // remove '('
        }
        else {  // operator
            while (precedence(peek()) >= precedence(ch)) {
                postfix[k++] = pop();
            }
            push(ch);
        }
    }

    // Pop remaining operators
    while (top != -1) {
        postfix[k++] = pop();
    }

    postfix[k] = '\0'; // Null-terminate string
    printf("Postfix Expression: %s\n", postfix);
}

int main() {
    char infix[MAX];

    printf("Enter infix expression: ");
    scanf("%s", infix);

    infixToPostfix(infix);

    return 0;
}