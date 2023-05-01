class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: ['Pizza Chef', 'Owner'] }
end
