fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar-container').innerHTML = data;
                const scriptTags = document.querySelectorAll('#navbar-container script');
                scriptTags.forEach(scriptTag => {
                    const newScript = document.createElement('script');
                    newScript.textContent = scriptTag.textContent;
                    document.body.appendChild(newScript);
                });
            });

    
fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer-container').innerHTML = data;
                const scriptTags = document.querySelectorAll('#navbar-container script');
                scriptTags.forEach(scriptTag => {
                    const newScript = document.createElement('script');
                    newScript.textContent = scriptTag.textContent;
                    document.body.appendChild(newScript);
                });
            }   );



