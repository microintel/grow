class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def add(self, data):
        new = Node(data)
        if self.head is None:
            self.head = new
        else:
            cur= self.head
            while cur.next is not None:
                cur= cur.next
            cur.next = new
            new.prev = cur

    def print_list(self):
        cur= self.head
        while cur is not None:
            print(cur.data)
            cur= cur.next

    def rem(self, data):
        cur= self.head
        while cur is not None:
            if cur.data == data:
                if cur== self.head:
                    self.head = cur.next
                    if self.head is not None:
                        self.head.prev = None
                else:
                    cur.prev.next = cur.next
                    if cur.next is not None:
                        cur.next.prev = cur.prev
                return
            cur= cur.next
my_list = DoublyLinkedList()
my_list.add(1)
my_list.add(2)
my_list.add(3)
my_list.print_list()
print("____")
my_list.rem(2)
my_list.print_list()
