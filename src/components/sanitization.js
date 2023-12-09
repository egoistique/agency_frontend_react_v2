
// защита от SQL инъекций
export const sanitizeSQL = (input) => {
    return input.replace(/'/g, "''");
  };

// защита от HTML инъекций (XSS)
export const sanitizeHTML = (input) => {
const span = document.createElement('span');
span.innerText = input;
return span.innerHTML;
};

// экранирование данных
export const escapeData = (input) => {
return input.replace(/[&<>"']/g, (char) => {
    switch (char) {
    case '&': return '&amp;';
    case '<': return '&lt;';
    case '>': return '&gt;';
    case '"': return '&quot;';
    case "'": return '&#39;';
    default: return char;
    }
});
};
  