import traceback
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator
from .models import TaskModels



app = APIRouter(
    prefix="/task", tags=["task_api"],
)

class Status(BaseModel):
    message: str



pt_task_details_pydantic_in = pydantic_model_creator(
    TaskModels, name="pt_banck_details_in", exclude_readonly=True
)
pt_bank_details_pydantic = pydantic_model_creator(
    TaskModels, name="pt_banck_details"
)


@app.post("/add_task_details", responses={500: {"description": "Internal Server Error"}})
async def add_task_details(tax: pt_task_details_pydantic_in):
    """
    This API adds tax details to pt_tax_details table
    """
    try:
        tax = await TaskModels.create(**tax.dict(exclude_unset=True))
        await pt_task_details_pydantic_in.from_tortoise_orm(tax)
    except Exception as ex:
        print(f"[add_task_details] Error:{ex} Traceback:{traceback.format_exc()}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Tax details not added: {ex}",
        )

    return  Status(message=f"Tax details Added ")



@app.delete(
    "/delete_task_details", responses={500: {"description": "Internal Server Error"}}
)
async def delete_task_details(id):
    """
    This API deletes tax details for a given id
    """
    try:
        await TaskModels.filter(id=id).delete()
    except Exception as ex:
        print(
            f"[delete_task_details] Error:{ex} Traceback:{traceback.format_exc()}"
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete tax details: {ex}",
        )

    return Status(message=f"Deleted tax details {id}")


@app.put(
    "/update_task_details", responses={500: {"description": "Internal Server Error"}}
)
async def update_task_details(id, tax: pt_task_details_pydantic_in):
    """
    This API updates tax details for a given id
    """
    try:
        await TaskModels.filter(id=id).update(**tax.dict(exclude_unset=True))
        await pt_task_details_pydantic_in.from_queryset_single(TaskModels.get(id=id))
    except Exception as ex:
        print(
            f"[update_task_details] Error:{ex} Traceback:{traceback.format_exc()}"
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update task details: {ex}",
        )
    return Status(message=f"Tax details updated id {id}")


@app.get(
    "/get_task_details", responses={500: {"description": "Internal Server Error"}}
)
async def get_task_details(id=None,status=None):
    """
    This API updates tax details for a given id
    """
    try:
        if id :
            data = await TaskModels.all().filter(id=id,).values()
        elif status:
            data = await TaskModels.all().filter(status=status).values()
        else:
            data = await TaskModels.all().values()

        
    except Exception as ex:
        print(
            f"[get_task_details] Error:{ex} Traceback:{traceback.format_exc()}"
        )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get task details: {ex}",
        )
    return data
