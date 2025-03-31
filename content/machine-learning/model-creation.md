---
title: Create and bring your own AI/ML model (BYOM)
layout: bundle
sector:
  - data_analytics
weight: 30
---

There is a wide variety of open-source libraries (such as, TensorFlow®, PyTorch, Keras, Scikit-learn) and commercial 3rd-party tooling (such as, Microsoft Azure Machine Learning Studio, Amazon SageMaker, IBM Watson, MATLAB, Google Cloud) available for developing AI/ML models. Therefore, {{< product-c8y-iot >}} offers you the flexibility to have your data science team remain working in their own optimized technology stack but still leverage their results in the field.

Some examples of model creation in the mentioned tools that can inspire you:

* [Prediction of Remaining Userful Life with TensorFlow](https://medium.com/@polanitzer/prediction-of-remaining-useful-life-of-an-engine-based-on-sensors-building-a-random-forest-in-ffad82c8a1c6)  
* [Anomaly Detection with AWS SageMaker](https://aws.amazon.com/blogs/machine-learning/detect-anomalies-in-manufacturing-data-using-amazon-sagemaker-canvas/)  
* [Image classification with Azure ML Studio](https://learn.microsoft.com/en-us/azure/machine-learning/tutorial-train-deploy-image-classification-model-vscode?view=azureml-api-2)  
* [Remaining Userful Life Estimation with MATLAB](https://www.mathworks.com/help/predmaint/ug/remaining-useful-life-estimation-using-convolutional-neural-network.html)

If you do not have access to tooling/expertise in-house for the BYOM and/or are looking for a very specific AI/ML use case, such as predictive maintenance, there are more out-of-the-box solutions that we can recommend. For example, we have partnered with BoonLogic who provide ML-based anomaly detection capabilities with their Amber product. This product can be embedded as a custom microservice within {{< product-c8y-iot >}} (that is, scenario B) and can be integrated using Streaming Analytics. To facilitate the integration even further, a plugin has been created consisting of an integration microservice to manage the communication between {{< product-c8y-iot >}} and BoonLogic Amber plus a set of front-end widgets to perform the configuration and visualize the output of the anomaly detection. More information can be found at [https://github.com/Cumulocity-IoT/Cumulocity-Amber-Boon-Logic/](https://github.com/Cumulocity-IoT/Cumulocity-Amber-Boon-Logic/).

This section highlighted how you can access historical data and train an AI/ML model for your specific use-case. The next section details how you can bring your created AI/ML model into action on new incoming data, aka perform model inferencing or model scoring. When deploying a model outside of the training environment, **it is important to consider the portability of your model to a different platform**. To overcome potential issues, a community of partners has created the Open Neural Network Exchange (ONNX) standard for representing ML models, allowing models from many frameworks (including the ones mentioned earlier) to be exported or converted into the standard ONNX format. Once your model is in the ONNX format, they are able to run on a variety of platforms and devices.
