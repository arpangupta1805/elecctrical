// Base URL - Change this to your IP address
const baseUrl = 'http://192.168.158.31'; // Leave blank so it sends requests to current domain

// Toggle button states
const states = {
    led: false,
    door: false,
    fan: false
};

// Function to send API request
async function sendRequest(endpoint) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        console.log('Request sent to:', `${baseUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to update toggle button appearance
function updateToggleButton(button, isOn) {
    if (isOn) {
        button.classList.add('bg-green-500');
        button.classList.remove('bg-gray-200');
    } else {
        button.classList.remove('bg-green-500');
        button.classList.add('bg-gray-200');
    }
}

// LED Toggle
const ledToggle = document.getElementById('ledToggle');
const ledStatus = document.getElementById('ledStatus');

ledToggle.addEventListener('click', async () => {
    states.led = !states.led;
    const endpoint = states.led ? 'led/on' : 'led/off';
    await sendRequest(endpoint);
    updateToggleButton(ledToggle, states.led);
    ledStatus.textContent = states.led ? 'On' : 'Off';
});

// Door Toggle
const doorToggle = document.getElementById('doorToggle');
const doorStatus = document.getElementById('doorStatus');

doorToggle.addEventListener('click', async () => {
    states.door = !states.door;
    const endpoint = states.door ? 'door/open' : 'door/close';
    await sendRequest(endpoint);
    updateToggleButton(doorToggle, states.door);
    doorStatus.textContent = states.door ? 'Open' : 'Closed';
});

// Fan Toggle
const fanToggle = document.getElementById('fanToggle');
const fanStatus = document.getElementById('fanStatus');

fanToggle.addEventListener('click', async () => {
    states.fan = !states.fan;
    const endpoint = states.fan ? 'fan/on' : 'fan/off';
    await sendRequest(endpoint);
    updateToggleButton(fanToggle, states.fan);
    fanStatus.textContent = states.fan ? 'On' : 'Off';
}); 