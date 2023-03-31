"""Script to upload books to your vector index by running the ask-my-book package locally."""
import sys
from pathlib import Path

import click
from steamship import Steamship

# Step 1: Give your index a name
sys.path.append(str(Path(__file__).parent.parent.resolve()))
from api import AskMyBook

INDEX_NAME = "mybookchatbot"

# Step 2: List the books or folders of books you want to add to your index
BOOKS_OR_BOOK_FOLDERS = [
    "upload/uploads",
]

if __name__ == "__main__":
    client = Steamship(workspace=INDEX_NAME)

    amb = AskMyBook(client, config={"index_name": INDEX_NAME})

    documents = amb.get_indexed_documents()

    if len(documents) > 0:
        print(
            "The index already contains the following books: \n* "
            + "\n* ".join(documents)
        )
        if click.confirm("Do you want to reset your index?", default=True):
            print("Resetting your index, this will take a while ⏳")
            amb.reset()

    for book in BOOKS_OR_BOOK_FOLDERS:
        data_path = Path(book)

        if data_path.is_dir():
            for child_data_path in data_path.iterdir():
                amb.add_document_from_path(child_data_path, child_data_path.name)
        else:
            amb.add_document_from_path(data_path, data_path.name)

    print("Your documents are successfully added to the index")
    print("You can query your documents on this endpoint: ")
