/* ==========================
   REVEAL ANIMATION
========================== */

.reveal {

    opacity: 0;

    transform: translateY(24px);

    transition:
        opacity 0.7s ease,
        transform 0.7s ease;
}

.revealed {

    opacity: 1;

    transform: translateY(0);
}

/* ==========================
   ACTIVE NAV LINK
========================== */

.active-link {

    color: var(--text) !important;
}