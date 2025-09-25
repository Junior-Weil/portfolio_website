# forward prop
# A_0 = x
# Z_1 = W_1 * A_0 + b_1
# A_1 = g(Z_1) = ReLu(Z_1)
# ReLu = x if x > 0 else 0 if x <= 0
# Output Layer softmax
# output layer -> e^{z_i} / sum(k, j=1, e^{z_j}) -> probs

# back prop
# dZ_2 = A_2 - Y
# Y is one hot encoded
# dW_2 = (1/m) * dZ_2 * A_1T
# db_2 = (1/m) sum(dZ_2)
# dZ_1 = W_2T * dZ_2 .* g'(Z_1)
# dW_1 = (1/m) * dZ_1 * x^T
# db_2 = (1/m) * sum(dZ_1)

# update params
# W_1 = W_1 - alpha * dW_1
# b_1 = b_1 - alpha * db_1
# W_2 = W_2 - alpha * dW_2
# b_2 = b_2 - alpha * db_2
# alpha = learning rate

import json
import urllib.parse
import boto3
import base64
import io
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
import os as os

def handler(event, context):


  data = np.array(data)
  m, n = data.shape
  np.random.shuffle(data)

  data_dev = data[0:1000].T
  Y_dev = data_dev[0]
  X_dev = data_dev[1:n]

  data_train = data[1000:m].T
  Y_train = data_train[0]
  X_train = data_train[1:n]
  X_train = X_train / 255

  _, m_train = X_train.shape

  x_train_shape = X_train[:, 0].shape #TODO display

  def init_params():
    W1 = np.random.rand(10, 784) - 0.5
    b1 = np.random.rand(10, 1) - 0.5
    W2 = np.random.rand(10, 10) - 0.5
    b2 = np.random.rand(10, 1) - 0.5
    return W1, b1, W2, b2

  def ReLU(Z):
    return np.maximum(0, Z)

  def softmax(Z):
    return np.exp(Z) / sum(np.exp(Z))

  def forward_prop(W1, b1, W2, b2, X):
    Z1 = W1.dot(X) + b1
    A1 = ReLU(Z1)
    Z2 = W2.dot(A1) + b2
    A2 = softmax(Z2)
    return Z1, A1, Z2, A2

  def one_hot(Y):
    one_hot_Y = np.zeros((Y.size, Y.max() + 1))
    one_hot_Y[np.arange(Y.size), Y] = 1
    one_hot_Y = one_hot_Y.T
    return one_hot_Y

  def deriv_ReLU(Z):
    return Z > 0

  def back_prop(Z1, A1, Z2, A2, W2, X, Y):
    # m = Y.size
    one_hot_Y = one_hot(Y)
    dZ2 = A2 - one_hot_Y
    dW2 = 1/m * dZ2.dot(A1.T)
    db2 = 1/m * np.sum(dZ2)
    dZ1 = W2.T.dot(dZ2) * deriv_ReLU(Z1)
    dW1 = 1/m * dZ1.dot(X.T)
    db1 = 1/m * np.sum(dZ1)
    return dW1, db1, dW2, db2

  def update_params(W1, b1, W2, b2, dW1, db1, dW2, db2, alpha):
    W1 = W1 - alpha * dW1
    b1 = b1 - alpha * db1
    W2 = W2 - alpha * dW2
    b2 = b2 - alpha * db2
    return W1, b1, W2, b2

  def get_predictions(A2):
    return np.argmax(A2, 0)

  def get_accuracy(predictions, Y):
    return f"{np.sum(predictions == Y) / Y.size}"

  def gradient_descent(X, Y, iterations, alpha, acc):
    W1, b1, W2, b2 = init_params()
    for i in range(iterations):
      Z1, A1, Z2, A2 = forward_prop(W1, b1, W2, b2, X)
      dW1, db1, dW2, db2 = back_prop(Z1, A1, Z2, A2, W2, X, Y)
      W1 , b1, W2, b2 = update_params(W1, b1, W2, b2, dW1, db1, dW2, db2, alpha)
      if i % 50 == 0:
        acc.append((f"Iteration: {i}\nAccuracy: {get_accuracy(get_predictions(A2), Y)}"))
    return W1, b1, W2, b2, acc

  acc = []
  W1, b1, W2, b2, acc = gradient_descent(X_train, Y_train, 500, 0.1)

  def make_predictions(X, W1, b1, W2, b2):
    _, _, _, A2 = forward_prop(W1, b1, W2, b2, X)
    predictions = get_predictions(A2)
    return predictions

  def test_predictions(index, W1, b1, W2, b2):
    current_image = X_train[:, index, None]
    predictions = make_predictions(X_train[:, index, None], W1, b1, W2, b2)
    label = Y_train[index]

    current_image = current_image.reshape((28,28)) * 255 # could also return this rather than making into an image with plt, if so see if you can remove import
    plt.gray()
    buf = io.BytesIO()
    plt.imsave(arr=current_image, fname=buf, format='png')
    buf.seek(0)
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return {
      "prediction": f'Prediction: {predictions}',
      'label': f'Label: {label}',
      'image': f"data:image/png;base64,{image_base64}",
      }

  test = [
          test_predictions(0, W1, b1, W2, b2),
          test_predictions(1, W1, b1, W2, b2),
          test_predictions(2, W1, b1, W2, b2),
          test_predictions(3, W1, b1, W2, b2)
          ]

  return {
    "statusCode": 200,
    "body": json.dumps({
      "x_train": x_train_shape,
      "accuracy": acc,
      "test": test,
    })
  }

# How to access test images in python
# print(f"this {test1}")
# img_str = test1['image'].split(',')[1] if ',' in test1['image'] else test1['image']
# missing_padding = len(img_str) % 4
# if missing_padding:
# 	img_str += '=' * (4 - missing_padding)
# img = base64.b64decode(img_str)
# # current_image is shape (28, 28) with values 0–255
# plt.imshow(plt.imread(io.BytesIO(img)), cmap='gray', vmin=0, vmax=255, interpolation='nearest')
# plt.axis('off')
# plt.show()

#<img src={json.image} />
#const imgSrc = `data:image/png;base64,${json.image}`;


# display: x_train_shape, acc, test

