# Task Management Application

This is a Task Management application that uses **FastAPI** for the backend and a **simple HTML/CSS/JS-based GUI** for the frontend. The backend provides a set of APIs to manage tasks, and the frontend allows users to interact with these APIs.

## Prerequisites

Before running the application, ensure that you have the following installed:

- **Python** version `>=3.9` and `<4.0`

- **Poetry** version `2.0.1`

You can install Poetry by following the instructions in the [official documentation](https://python-poetry.org/docs/#installation).

## Setup

1. Clone the repository to your local machine:

    ```bash
    git clone git@github.com:Zeyarahi123/task-management.git
    cd task-management
    ```

2. Install **Poetry** (if not already installed):

    ```bash
    curl -sSL https://install.python-poetry.org | python3 -
    ```

3. Install project dependencies using Poetry:

    ```bash
    poetry install -vv
    ```

4. Update project dependencies:

    ```bash
    poetry update -vv
    ```

## Running the FastAPI Server

1. Run the FastAPI server:

    ```bash
    poetry run task-api-web
    ```

    This will start the GUI main page and FastAPI backend server. You should see the server running at `http://127.0.0.1:8080/docs`.


## APIs

The following API endpoints are available in the backend:

- **Add Task**: POST `/task/add_task_details`
- **Update Task**: PUT `/task/update_task_details`
- **Get Task Details**: GET `/task/get_task_details`
- **Delete Task**: DELETE `/task/delete_task_details`

## Troubleshooting

- If you face any issues related to dependencies or installation, ensure that you are using the correct Python version (`>=3.9` and `<4.0`).
- If the FastAPI server doesn't start correctly, check if there are any port conflicts or permission issues.

## Contributing

Feel free to fork the repository and submit pull requests. Ensure that your code follows the existing style guide and passes all tests.

## License

This project is licensed under the MIT License.
