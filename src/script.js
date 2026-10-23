function initNavbar() {
  const hamburger = document.getElementById('hamburger')
  const navMenu = document.getElementById('nav-menu')
  const navLinks = document.querySelectorAll('.nav-link')

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active')
      navMenu.classList.toggle('active')
    })
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active')
      navMenu?.classList.remove('active')
    })
  })

  const sections = document.querySelectorAll('section')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      navLinks.forEach((link) => link.classList.remove('active'))
      document.querySelector(`a[href="#${entry.target.id}"]`)?.classList.add('active')
    })
  }, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' })

  sections.forEach((section) => observer.observe(section))
}

function initTypingEffect() {
  const typingText = document.getElementById('typing-text')
  if (!typingText) return

  const phrases = ['Web Developer', 'Front-End', 'Problem Solver', 'Code Explorer', 'Innovator']
  let phraseIndex = 0
  let characterIndex = 0
  let deleting = false

  const typeEffect = () => {
    const phrase = phrases[phraseIndex]
    typingText.textContent = deleting
      ? phrase.substring(0, characterIndex - 1)
      : phrase.substring(0, characterIndex + 1)
    characterIndex += deleting ? -1 : 1

    let delay = deleting ? 50 : 100
    if (!deleting && characterIndex === phrase.length) {
      deleting = true
      delay = 2000
    } else if (deleting && characterIndex === 0) {
      deleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      delay = 500
    }

    window.setTimeout(typeEffect, delay)
  }

  typeEffect()
}

function initOrbitAnimations() {
  document.querySelectorAll('.random-orbit').forEach((planet, index) => {
    const startAngle = Math.random() * 360
    const radius = 120 + index * 40
    const duration = 15 + Math.random() * 15
    const direction = Math.random() > 0.5 ? 'normal' : 'reverse'
    const animationName = `orbit${index}`
    const style = document.createElement('style')

    style.textContent = `@keyframes ${animationName} { from { transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg); } to { transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg); } }`
    document.head.appendChild(style)
    planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`
    planet.addEventListener('mouseenter', () => { planet.style.animationPlayState = 'paused' })
    planet.addEventListener('mouseleave', () => { planet.style.animationPlayState = 'running' })
  })
}

function initSunPhotoModal() {
  const sun = document.querySelector('.sun-core')
  const modal = document.getElementById('photo-modal')
  const closeButton = document.querySelector('.close')
  const randomPhoto = document.getElementById('random-photo')
  if (!sun || !modal || !closeButton || !randomPhoto) return

  sun.addEventListener('click', () => {
    randomPhoto.src = `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000) + 1}`
    modal.style.display = 'block'
  })
  closeButton.addEventListener('click', () => { modal.style.display = 'none' })
  window.addEventListener('click', (event) => {
    if (event.target === modal) modal.style.display = 'none'
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') modal.style.display = 'none'
  })
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.getElementById(link.getAttribute('href').substring(1))
      if (!target) return
      event.preventDefault()
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    })
  })
}

function initSectionAnimations() {
  const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translate(0)'
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  elements.forEach((element) => observer.observe(element))
}

function initContactForm() {
  const form = document.getElementById('contact-form')
  if (!form) return

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const senderName = formData.get('user_name') || 'Portfolio visitor'
    const senderEmail = formData.get('user_email')
    formData.set('_subject', `New portfolio message from ${senderName}`)
    formData.set('_replyto', senderEmail)
    formData.set('_captcha', 'false')
    formData.set('_template', 'table')

    fetch('https://formsubmit.co/ajax/Joshuabayuranmansueto@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Message could not be sent')
        return response.json()
      })
      .then(() => {
        window.alert('Message sent successfully!')
        form.reset()
      })
      .catch((error) => window.alert(`Failed to send message: ${error.message}`))
  })
}

export function initializePortfolio() {
  initNavbar()
  initTypingEffect()
  initOrbitAnimations()
  initSunPhotoModal()
  initSmoothScroll()
  initSectionAnimations()
  initContactForm()
}
