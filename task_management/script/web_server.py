import uvicorn
import webbrowser
import os

def main():
    open_html_file("task_management/task_templates/index.html")
    server_port=8080
    uvicorn.run(
        "task_management.task_api.register_tortoise:main_app",
        host="0.0.0.0",
        port=server_port,
        workers=1,
        reload=True
    )


def open_html_file(file_path):
    abs_path = os.path.abspath(file_path)  
    webbrowser.open(f"file://{abs_path}")  

