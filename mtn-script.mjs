import crypto from 'crypto';

async function setup() {
  const subKey = '730ad2ec470048318bd7bc7d0e1ca9b7';
  const apiUserId = crypto.randomUUID();

  try {
    const res1 = await fetch('https://sandbox.momodeveloper.mtn.com/v1_0/apiuser', {
      method: 'POST',
      headers: {
        'X-Reference-Id': apiUserId,
        'Ocp-Apim-Subscription-Key': subKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ providerCallbackHost: 'example.com' })
    });
    
    if (!res1.ok && res1.status !== 201) {
       console.log(`Failed to create API User: ${res1.status} ${await res1.text()}`);
       return;
    }

    const res2 = await fetch(`https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${apiUserId}/apikey`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subKey
      }
    });

    const data = await res2.json();
    console.log("=== MTN SANDBOX CREDENTIALS ===");
    console.log("MTN_API_USER_ID=" + apiUserId);
    console.log("MTN_API_SECRET=" + data.apiKey);
  } catch (error) {
    console.error("Exception:", error);
  }
}

setup();
