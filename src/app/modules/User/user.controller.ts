import httpStatus from 'http-status'
import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { UserService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User is created succesfully',
    data: result,
  })
})

const findUserById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserService.findUserById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  })
})
const findUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params
  const result = await UserService.findUserFromDBByEmail(email)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  })
})

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserService.updateUserById(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  })
})

const deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserService.deleteUserById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is deleted succesfully',
    data: result && null,
  })
})

export const UserController = {
  createUser,
  findUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  findUserByEmail,
}
