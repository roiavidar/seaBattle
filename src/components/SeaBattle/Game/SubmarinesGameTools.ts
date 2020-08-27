export interface SubmarineModel {
    vertical: boolean;
    size: number;
    dropped?: boolean;
    id?: number;
    hide?: boolean;
}

export const horizontalSubmarine = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAACTk5OioqJra2uenp7p6emysrLKysr7+/uurq75+fnm5uby8vL29vbX19fDw8N6enp0dHS9vb0dHR1hYWE1NTVmZmZRUVE4ODgWFha+vr6YmJguLi7g4OAICAhJSUlCQkKHh4dYWFglJSXQ0NCDg4M+Pj6Qg9bZAAAD1ElEQVR4nO3c6XaqMBSG4TJUFAUBx6LicLTe/x0ep1YrITtBELLX9/zqpIu3yBSiHx8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgLG/mnk2GTS9IbWzrqtv0gtQGheZDofm4Fn76We/6FdPCXmpZU9fLTl8ueRYGt6zUHX3zLFxYOcwKl/lCr+llqta/fKG1ml22SyYEgVeJ32l62SrRKSzkskVG0kIOW6RgR8OscM6+cM+9MJMGcijssi+02RdOuBf2V9wL5Wc0HArlZzQcCokdDYPCGfvCNffCgAg0v1AwRsOsUH7pxKFQfunEoZAKNL5wwL6QOqMxv5A6ozG/UDQYzKqwR1w6mV9IjNEwKCTGaBgU0juaegrDoNTD+qNPTc6WLnSd+587vhcdBv3ey4WDVaj9mGDh0ktblfEm2TndQbkVcdaxtnr/pn7kpu/ru4fOY2/YL1eolbiYUVexdUrnjv40v/Pw11bthRpGSYN1v+JIb7u6DPApJAbtyLuKD7qF1Au1F7njhqOeHH3lbfI2SLuR/En3jXtODbbii/VnGHok/nXYjRvNkHKUdpE/hUfB7/pR0rIX55OpytSG31sJuZV4iMV5S/utltJh5ESjcPXnx8PvwidV+LdVypOuxjE51+h+O+i+Eoc72e32WnMEfGmhZS2Ix98Lbysxs7/kz1h70hOqkLoiebild1qJgUPktbGw6Dhw81B49Mgh23YWWtJTHOq2rBGFY9nBv/2F8n3plSt5vH6h82ZK54ySiyrynp4Z5oWBWYuuiV5ScOAPufSdrjRKb8OmEL5Md00vVZVSwWCcwnHGJINcYG/a9DJVK19I35E1CwqNJ9jTMCsUHC2YFQqO+KH8jQGmEZ16K9yxNMdWEKgyN8IcBQOnxSOGpim8eDrQ405mkAyaLuhJLgbwiwN5XOPLh/b1x2laZyMNZFA4Je6xGV+4oW4iPhTukyamkbxINlKaK3Q+ghHx5rLWWZKBj4WX7wPfoOPHWuse8GkV3mRLQ04EEqX5GL+F68efDu32j+KsIpW+h0Ln7897w5YPNqpNxHgo3AvW+KG9Q+I79ZlfP4WO+NfdNs43Gds6czFvhaJVeNWS+Xp3G7/EzD3Lkn5yShi1Z95XrD398lKY0h8NM5o0ObH0KnUVd5+5wn1+NFUgGFFvcq3VV9wtNUX4XJgqBV4ivWbO6tLEyUpPae8Q2+CzUG1KSnWmO++1j1ca6AW+MXJ8nNijCj69NSj1HAPfrVNse8Os/PsPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQM9/u7FFbQgvh/EAAAAASUVORK5CYII='
export const verticalSubmarine = 'https://st4.depositphotos.com/3369547/30981/v/1600/depositphotos_309817396-stock-illustration-bat-upside-down-on-white.jpg'
export const getSubmarines: () => SubmarineModel[] = function getSubmarines() {
    return [
        {
            id: 1,
            vertical: false,
            size: 4
        },
        // {
        //     id: 2,
        //     vertical: false,
        //     size: 3
        // },
        // {
        //     id: 3,
        //     vertical: false,
        //     size: 2
        // },
        // {
        //     id: 4,
        //     vertical: false,
        //     size: 2
        // },
        // {
        //     id: 5,
        //     vertical: false,
        //     size: 1
        // },
        // {
        //     id: 6,
        //     vertical: false,
        //     size: 1
        // },
        // {
        //     id: 7,
        //     vertical: false,
        //     size: 1
        // },
        // {
        //     id: 8,
        //     vertical: false,
        //     size: 1
        // }
    ]
}
