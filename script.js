  let currentOpenModal = null;

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