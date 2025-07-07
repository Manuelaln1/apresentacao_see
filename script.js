let currentOpenModal = null;

    function openModalAndPauseAnimations(id) {
        const modalToOpen = document.getElementById(`modal-${id}`);
        if (!modalToOpen) return;

        currentOpenModal = modalToOpen;
        currentOpenModal.style.display = 'flex';
        
        // Pausar a animação do contêiner giratório
        const rotatingContainer = document.getElementById('rotating-divisions-container');
        if (rotatingContainer) {
            rotatingContainer.style.animationPlayState = 'paused';
        }
    }

    function closeModalAndResumeAnimations() {
        if (currentOpenModal) {
            currentOpenModal.style.display = 'none';
        }
        
        // Retomar a animação do contêiner giratório
        const rotatingContainer = document.getElementById('rotating-divisions-container');
        if (rotatingContainer) {
            rotatingContainer.style.animationPlayState = 'running';
        }
        currentOpenModal = null;
    }
    
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', closeModalAndResumeAnimations);
    });

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModalAndResumeAnimations();
        }
    }

    // Função para posicionar as divisões uniformemente no contêiner giratório
    function positionDivisionsOnOrbit() {
        // Obter o contêiner giratório, não a órbita principal diretamente
        const rotatingContainer = document.getElementById('rotating-divisions-container');
        if (!rotatingContainer) return; // Garante que o contêiner exista antes de tentar acessá-lo

        const divisions = rotatingContainer.querySelectorAll('.division');
        const numDivisions = divisions.length;

        // O raio da "órbita" que as divisões devem seguir é o raio do contêiner giratório.
        // Como o contêiner giratório tem 100% da largura/altura da órbita pai, usamos o offsetWidth/2 dele.
        const orbitRadius = (rotatingContainer.offsetWidth / 2); 
        // Verifica se há divisões antes de tentar acessar offsetWidth
        const divisionSize = divisions.length > 0 ? divisions[0].offsetWidth : 0; 

        // Posição inicial (em graus), para que a primeira divisão comece no topo
        const startAngle = -90; 

        divisions.forEach((division, index) => {
            // Calcular o ângulo para cada divisão, distribuindo-as uniformemente
            const angle = startAngle + (360 / numDivisions) * index; 
            const angleRad = (angle * Math.PI) / 180; // Converter para radianos

            // Calcular a posição x e y em relação ao centro do contêiner giratório
            const x = orbitRadius * Math.cos(angleRad) - (divisionSize / 2); // Centralizar a divisão horizontalmente
            const y = orbitRadius * Math.sin(angleRad) - (divisionSize / 2); // Centralizar a divisão verticalmente

            // Definir a posição absoluta da divisão dentro do contêiner giratório
            division.style.left = `${x + orbitRadius}px`;
            division.style.top = `${y + orbitRadius}px`;
            
            // Definir animationDelay para que as divisões iniciem já distribuídas.
            // A duração da animação do contêiner giratório é de 60s.
            division.style.animationDelay = `${(60 / numDivisions) * index * -1}s`; 
        });
    }

    // Chamar a função de posicionamento quando a página carregar
    window.onload = function() {
        positionDivisionsOnOrbit();
    };

    // Re-posicionar as divisões se a janela for redimensionada
    window.addEventListener('resize', positionDivisionsOnOrbit);


        function openModalAndPauseAnimations(id) {
            const modalToOpen = document.getElementById(`modal-${id}`);
            if (!modalToOpen) return;

            currentOpenModal = modalToOpen;
            currentOpenModal.style.display = 'flex';
            
            document.querySelectorAll('.orbit, .division').forEach(el => el.style.animationPlayState = 'paused');
        }

        function closeModalAndResumeAnimations() {
            if (currentOpenModal) {
                currentOpenModal.style.display = 'none';
            }
            
            document.querySelectorAll('.orbit, .division').forEach(el => el.style.animationPlayState = 'running');
            currentOpenModal = null;
        }
        
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', closeModalAndResumeAnimations);
        });

        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                closeModalAndResumeAnimations();
            }
        }

        
