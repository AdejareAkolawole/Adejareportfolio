document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true
    });

    // Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // Skills Chart
    const skillsChart = document.getElementById('skillsChart');
    if (skillsChart) {
        new Chart(skillsChart, {
            type: 'bar',
            data: {
                labels: ['HTML', 'CSS', 'JavaScript', 'Social Media', 'SEO'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 80, 95, 75],
                    backgroundColor: 'rgba(255, 203, 116, 0.7)',
                    borderColor: '#2F2F2F',
                    borderWidth: 2,
                    hoverBackgroundColor: '#FFCB74',
                    hoverBorderColor: '#111111'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(47, 47, 47, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#111111',
                            font: {
                                size: 14,
                                family: "'Poppins', sans-serif"
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'
                }
            }
        });
    }

    // Current Date with Luxon
    const currentDate = document.getElementById('currentDate');
    if (currentDate) {
        const DateTime = luxon.DateTime;
        currentDate.textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
    }

    // Order Button Functionality with SweetAlert2 and Floating UI
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default behavior
            const service = button.getAttribute('data-service');
            const statusDiv = button.nextElementSibling;

            // Ensure SweetAlert2 is loaded
            if (typeof Swal === 'undefined') {
                console.error('SweetAlert2 is not loaded');
                return;
            }

            Swal.fire({
                title: `Order ${service}`,
                text: 'Ready to proceed with payment?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Pay Now',
                cancelButtonText: 'Cancel',
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#111111',
                confirmButtonColor: '#FFCB74',
                cancelButtonColor: '#2F2F2F',
                backdrop: 'rgba(47, 47, 47, 0.4)',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    statusDiv.style.display = 'flex';
                    const statuses = statusDiv.querySelectorAll('span');
                    statuses.forEach(s => s.classList.remove('active')); // Reset active status
                    statuses[0].classList.add('active');

                    // Simulate order status updates
                    setTimeout(() => {
                        statuses[0].classList.remove('active');
                        statuses[1].classList.add('active');
                    }, 2000);
                    setTimeout(() => {
                        statuses[1].classList.remove('active');
                        statuses[2].classList.add('active');
                        Swal.fire({
                            title: 'Order Complete!',
                            text: `${service} has been shipped!`,
                            icon: 'success',
                            background: 'rgba(255, 255, 255, 0.95)',
                            color: '#111111',
                            confirmButtonColor: '#FFCB74',
                            showClass: {
                                popup: 'animate__animated animate__fadeInUp'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutDown'
                            }
                        });
                    }, 4000);
                }
            }).catch((error) => {
                console.error('SweetAlert2 error:', error);
            });

            // Floating UI Tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = `Order ${service}`;
            document.body.appendChild(tooltip);

            FloatingUI.computePosition(button, tooltip, {
                placement: 'top',
                middleware: [FloatingUI.offset(8), FloatingUI.flip(), FloatingUI.shift()]
            }).then(({x, y}) => {
                Object.assign(tooltip.style, {
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                    transition: 'opacity 0.3s, transform 0.3s'
                });
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateY(0)';
                }, 100);
            }).catch((error) => {
                console.error('Floating UI error:', error);
            });

            button.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }, { once: true });
        });
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});