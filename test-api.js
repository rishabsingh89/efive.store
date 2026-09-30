fetch('http://localhost:5173/api/save-cms-codebase', { method: 'POST', body: JSON.stringify({products:[]}) }).then(r => r.json()).then(console.log).catch(console.error);
