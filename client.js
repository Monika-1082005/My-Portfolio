document.addEventListener('DOMContentLoaded', function () {
  // console.log('DOM fully loaded');

  const form = document.getElementById('contactForm');
  // console.log('Form element:', form);

  if (form) {
    form.addEventListener('submit', async function (event) {
      // console.log('Form submission event triggered');
      event.preventDefault();

      const formData = new URLSearchParams(new FormData(form));
      const msgElement = document.getElementById('msg');
      // console.log('Message element:', msgElement);

      try {
        // console.log('Sending fetch request');
        const response = await fetch('http://127.0.0.1:3019/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });

        // console.log('Response received:', response);

        if (response.ok) {
          const result = await response.json();
          // console.log('Response data:', result);

          if (msgElement) {
            msgElement.innerText = result.message || 'Form submitted successfully';
            // console.log('Message set:', msgElement.innerText);
          } else {
            // console.error('Message element not found');
          }

          form.reset();
          // console.log('Form reset');

          setTimeout(() => {
            if (msgElement) {
              msgElement.innerText = "";
              // console.log('Message cleared');
            }
          }, 5000);
        } else {
          // console.error('Response not OK:', response.status, response.statusText);
          if (msgElement) {
            msgElement.innerText = "There was an error submitting the form.";
          }
        }
      } catch (error) {
        // console.error("Error:", error);
        if (msgElement) {
          msgElement.innerText = "There was an error submitting the form.";
        }
      }
    });
  } else {
    // console.error('Form element not found');
  }
});