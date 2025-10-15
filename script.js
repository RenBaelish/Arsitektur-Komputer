document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- Efek Fade-in saat Scroll ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // --- Logika Latihan Interaktif ---
    const revealButtons = document.querySelectorAll('.reveal-btn');
    revealButtons.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                button.textContent = 'Tampilkan Jawaban';
            } else {
                answer.style.display = 'block';
                button.textContent = 'Sembunyikan Jawaban';
            }
        });
    });

    // --- Logika Kuis (DIPERBARUI DENGAN 15 SOAL) ---
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Jawaban untuk 15 soal
            const answers = {
                q1: 'c', q2: 'b', q3: 'b', q4: 'b', q5: 'c',
                q6: 'b', q7: 'b', q8: 'b', q9: 'b', q10: 'a',
                q11: 'a', q12: 'b', q13: 'b', q14: 'b', q15: 'c'
            };
            let score = 0;
            const totalQuestions = Object.keys(answers).length;
            const formData = new FormData(quizForm);

            // Loop untuk cek jawaban, sorot, dan tampilkan penjelasan
            for (const [question, correctAnswer] of Object.entries(answers)) {
                const userAnswer = formData.get(question);
                const inputs = quizForm.querySelectorAll(`input[name="${question}"]`);

                inputs.forEach(input => {
                    const label = input.parentElement;
                    label.classList.remove('correct-answer', 'incorrect-answer');

                    if (input.value === correctAnswer) {
                        label.classList.add('correct-answer');
                    }

                    if (input.checked && userAnswer !== correctAnswer) {
                        label.classList.add('incorrect-answer');
                    }
                });

                if (userAnswer === correctAnswer) {
                    score++;
                }

                const explanationDiv = document.getElementById(`explanation-${question}`);
                if (explanationDiv) {
                    explanationDiv.style.display = 'block';
                }
            }

            // Tampilkan skor akhir
            const resultsContainer = document.getElementById('quiz-results');
            resultsContainer.innerHTML = `Anda benar ${score} dari ${totalQuestions} soal!`;
            if(score >= 13) { resultsContainer.innerHTML += " Luar biasa, pemahaman Anda sangat baik! 🚀"; }
            else if (score >= 8) { resultsContainer.innerHTML += " Bagus sekali! 👍"; }
            else { resultsContainer.innerHTML += " Terus berlatih untuk meningkatkan skor Anda!"; }
        });
    }
});
