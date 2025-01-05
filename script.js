document.getElementById('booking-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      from: document.getElementById('from').value,
      to: document.getElementById('to').value,
      date: document.getElementById('date').value,
      passengers: parseInt(document.getElementById('passengers').value),
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/book-flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        window.location.href = 'success.html'; // Redirect to success page
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Something went wrong. Please try again later.');
    }
  });
  