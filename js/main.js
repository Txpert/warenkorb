// Erstellen eines leeren Warenkorbs als Array
let cart = [];

// Funktion zum Hinzufügen von Produkten zum Warenkorb
function addToCart(productName, price) {
    // Prüfen, ob das Produkt bereits im Warenkorb ist
    let existingProductIndex = findProductIndex(productName);
    
    if (existingProductIndex !== -1) {
        // Wenn das Produkt bereits im Warenkorb ist, erhöhe die Menge
        cart[existingProductIndex].quantity += 1;
    } else {
        // Wenn nicht, füge ein neues Produkt mit Menge 1 hinzu
        let product = {
            name: productName,
            price: price,
            quantity: 1
        };
        cart.push(product);
    }
    
    // Warenkorb anzeigen aktualisieren
    displayCart();
    
    // Animation oder Feedback hinzufügen (optional)
    showAddedFeedback(productName);
}

// Hilfsfunktion zum Finden eines Produkts im Warenkorb
function findProductIndex(productName) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            return i;
        }
    }
    return -1; // Produkt nicht gefunden
}

// Funktion zum Entfernen von Produkten aus dem Warenkorb
function removeFromCart(index) {
    // Element an der angegebenen Position entfernen
    cart.splice(index, 1);
    
    // Warenkorb anzeigen aktualisieren
    displayCart();
}

// Funktion zum Ändern der Produktmenge
function changeQuantity(index, change) {
    // Neue Menge berechnen
    let newQuantity = cart[index].quantity + change;
    
    if (newQuantity <= 0) {
        // Wenn die Menge 0 oder weniger wird, Produkt entfernen
        removeFromCart(index);
    } else {
        // Sonst Menge aktualisieren
        cart[index].quantity = newQuantity;
        displayCart();
    }
}

// Funktion zur Berechnung der Gesamtsumme
function calculateTotal() {
    let total = 0;
    
    // Für jedes Produkt im Warenkorb
    cart.forEach(function(product) {
        // Preis × Menge zum Gesamtbetrag addieren
        total = total + (product.price * product.quantity);
    });
    
    // Gesamtsumme auf zwei Dezimalstellen runden
    return total.toFixed(2);
}

// Funktion zur Anzeige des Warenkorbs
function displayCart() {
    // HTML-Element für den Warenkorb abrufen
    let cartElement = document.getElementById("cart-items");
    
    // Warenkorb leeren
    cartElement.innerHTML = "";
    
    // Wenn der Warenkorb leer ist, entsprechende Meldung anzeigen
    if (cart.length === 0) {
        cartElement.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    } else {
        // Für jedes Produkt im Warenkorb
        cart.forEach(function(product, index) {
            // Neues Div für das Warenkorb-Element erstellen
            let item = document.createElement("div");
            item.className = "cart-item";
            
            // HTML für das Warenkorb-Element erstellen
            let itemHTML = `
                <div>
                    <span>${product.name}</span>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="quantity">${product.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div>
                    <span>€${(product.price * product.quantity).toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
                </div>
            `;
            
            // HTML in das Element einfügen
            item.innerHTML = itemHTML;
            
            // Element zum Warenkorb hinzufügen
            cartElement.appendChild(item);
        });
    }
    
    // Gesamtsummenanzeige aktualisieren
    let totalElement = document.getElementById("cart-total");
    totalElement.innerHTML = "Gesamtsumme: €" + calculateTotal();
    
    // Warenkorb im localStorage speichern (für Persistenz)
    saveCart();
}

// Funktion zum Speichern des Warenkorbs im localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funktion zum Laden des Warenkorbs aus dem localStorage
function loadCart() {
    let savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayCart();
    }
}

// Funktion für visuelles Feedback beim Hinzufügen (optional)
function showAddedFeedback(productName) {
    // Hier könnte eine Animation oder ein Hinweis angezeigt werden
    console.log(`${productName} wurde zum Warenkorb hinzugefügt!`);
}

// Event-Listener für die Produkt-Buttons einrichten
document.getElementById("add-toy").onclick = function() {
    addToCart("Spielzeugauto", 12.99);
};

document.getElementById("add-book").onclick = function() {
    addToCart("Märchenbuch", 9.99);
};

document.getElementById("add-chocolate").onclick = function() {
    addToCart("Schokolade", 2.50);
};

// Warenkorb beim Laden der Seite initialisieren
window.onload = function() {
    loadCart();
};
