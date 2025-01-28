"""empty message

Revision ID: 72a89d6d107d
Revises: f571d33429c4
Create Date: 2025-01-28 14:25:50.616635

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '72a89d6d107d'
down_revision = 'f571d33429c4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('virtual_class',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('time', sa.Time(), nullable=False),
    sa.Column('link', sa.String(length=255), nullable=False),
    sa.Column('teacher_id', sa.Integer(), nullable=False),
    sa.Column('class_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['class_id'], ['class.id'], ),
    sa.ForeignKeyConstraint(['teacher_id'], ['teacher.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('virtual_class')
    # ### end Alembic commands ###
