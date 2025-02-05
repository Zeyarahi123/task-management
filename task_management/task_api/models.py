from tortoise import Model, fields


class TaskModels(Model):
    id = fields.IntField(pk=True)
    description = fields.TextField(null=True)
    deadline = fields.TextField(null=True)
    status = fields.CharField(max_length=50,null=True)

    class Meta:
        table = "task"

