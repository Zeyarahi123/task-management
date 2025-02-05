from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from .task import app as task

main_app= FastAPI()



url="sqlite://task.db"

origins = ["*"]

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_tortoise(
    main_app,
    db_url=url,
    modules={"models": ["task_management.task_api.models"]}, 
    generate_schemas=True,
    add_exception_handlers=True
)

# conn = sqlite3.connect("tasks.db")
# cursor = conn.cursor()
# cursor.execute('''CREATE TABLE IF NOT EXISTS tasks (
#                     id INTEGER PRIMARY KEY AUTOINCREMENT,
#                     description TEXT NOT NULL,
#                     deadline TEXT,
#                     status TEXT NOT NULL)''')
# conn.commit()
# cursor.close()
# return conn, cursor


main_app.include_router(task)
