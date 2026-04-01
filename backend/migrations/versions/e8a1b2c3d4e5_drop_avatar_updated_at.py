"""drop avatar_updated_at from users

Revision ID: e8a1b2c3d4e5
Revises: dfc505ad468d
Create Date: 2026-04-01

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "e8a1b2c3d4e5"
down_revision: Union[str, Sequence[str], None] = "dfc505ad468d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  op.drop_column("users", "avatar_updated_at")


def downgrade() -> None:
  op.add_column(
    "users",
    sa.Column("avatar_updated_at", sa.DateTime(), nullable=True),
  )
