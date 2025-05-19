class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class SLL:
    def __init__(self):
        self.prime = None

    def add(self, data):
        new_node = Node(data)
        if self.prime is None:
            self.prime = new_node
        else:
            cur = self.prime
            while cur.next is not None:
                cur = cur.next
            cur.next = new_node

    def print_list(self):
        cur = self.prime
        while cur is not None:
            print(cur.data)
            cur = cur.next

    def search(self, data):
        cur = self.prime
        while cur is not None:
            if cur.data == data:
                return True
            cur = cur.next
        return False

    def remove(self, data):
        cur = self.prime
        back = None
        while cur is not None:
            if cur.data == data:
                if back is None:
                    self.prime = cur.next
                else:
                    back.next = cur.next
                del cur
                break
            back = cur
            cur = cur.next


l =SLL()
l.add(1)
l.add(2)
l.add(3)
l.print_list()
print("____")
l.remove(1)


l.print_list()
