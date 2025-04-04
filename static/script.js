document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload-input')
    const preview = document.getElementById('preview')
    const clearButton = document.getElementById('clear-button')
    const predictButton = document.getElementById('predict-button')
    const loading = document.getElementById('loading')
    const resultContainer = document.getElementById('result-container')
    const predictedClass = document.getElementById('predicted-class')
    const confidence = document.getElementById('confidence')
    const topPredictions = document.getElementById('top-predictions')
    
    let imageData = null
  
    // When user selects a file, show a preview
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = function(event) {
          imageData = event.target.result // base64 image data
          preview.src = imageData
          preview.style.display = 'block'
        }
        reader.readAsDataURL(file)
      }
    })
    
    // Clear upload and preview
    clearButton.addEventListener('click', () => {
      uploadInput.value = ''
      preview.src = ''
      preview.style.display = 'none'
      imageData = null
      // Hide results if any
      resultContainer.classList.add('hidden')
    })
    
    // Make prediction
    predictButton.addEventListener('click', async () => {
      if (!imageData) {
        alert('Please upload an image first.')
        return;
      }
      
      // Show loading spinner and hide results
      loading.classList.remove('hidden')
      resultContainer.classList.add('hidden')
      
      try {
        // Send image data to backend for prediction
        const response = await fetch('/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: imageData })
        })
        
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        
        const result = await response.json()
        
        // Update UI with prediction results
        predictedClass.textContent = result.predicted_class
        confidence.textContent = result.confidence.toFixed(2)
        
        // Clear and populate top predictions list
        topPredictions.innerHTML = ''
        result.top_predictions.forEach(prediction => {
          const li = document.createElement('li')
          li.textContent = `${prediction.class}: ${prediction.confidence.toFixed(2)}%`
          topPredictions.appendChild(li)
        })
        
        resultContainer.classList.remove('hidden')
      } catch (error) {
        console.error('Error:', error)
        alert('Error making prediction. Please try again.')
      } finally {
        loading.classList.add('hidden')
      }
    })
  })