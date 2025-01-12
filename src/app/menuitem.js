const menuItems = {
  Cakes: [
    { name: "Chocolate Cake", price: "35", id: "chocolatecake", image: "/ChocolateCake.jpg", desc: "Rich and moist chocolate cake with a perfect balance of chocolate and sweetness. All cakes are 3 layers and 8 inches." },
    { name: "Vanilla Cake", price: "35", id: "vanillacake", image: "/Vanillacake.jpg", desc: "Layers of classic, soft and fluffy vanilla cake. All cakes are 3 layers and 8 inches." },
    { name: "Red Velvet Cake", price: "45", id: "redvelvetcake", image: "/Redvelcake.jpg", desc: "Velvety red cake with a hint of cocoa and a smooth cream cheese frosting. All cakes are 3 layers and 8 inches." },
    { name: "Carrot", price: "45", id: "carrot", image: "/Carrot.jpg", desc: "Moist carrot cake with warm spices and a cream cheese frosting. All cakes are 3 layers and 8 inches." },
    { name: "Lemon & Strawberry", price: "45", id: "leemonandstraw", image: "/scake.png", desc: "Lemon & Strawberry Cake: Layers of Lemon and Strawberry cake topped with lemon buttercream and fresh strawberries. All cakes are 3 layers and 8 inches." },
    { name: "German's Chocolate", price: "45", id: "gchoco", image: "/GermanChocolate.jpg", desc: "Decadent chocolate cake layered with coconut and pecan frosting. All cakes are 3 layers and 8 inches." },
    { name: "Lemon & Blueberry", price: "45", id: "lnb", image: "/lemonblueberry.jpg", desc: "Layers of Lemon cake with fresh blueberries, decorated with buttercream frosting and fresh blueberries. All cakes are 3 layers and 8 inches." },
    { name: "Lemon & Raspberry", price: "45", id: "lnr", image: "/lemonraspc.jpg", desc: "Layers of Lemon cake filled with a fresh raspberry compote, decorated with buttercream frosting and fresh raspberries. All cakes are 3 layers and 8 inches." },
    { name: "Pound Cake", price: "40", id: "pcakes", image: "/poundcakes.jpg", desc: "Dense and buttery pound cake perfect for any occasion. All cakes are 3 layers and 8 inches." },
    { name: "Strawberry", price: "35", id: "strawb", image: "/Strawberry.jpg", desc: " Layers of strawberry cake topped with buttercream frosting and garnished with fresh strawberries. All cakes are 3 layers and 8 inches." },
    { name: "Lemon", price: "35", id: "leemon", image: "/lemoncake.jpg", desc: " Layers of moist and decadent lemon cake, topped with a fresh lemon buttercream frosting. All cakes are 3 layers and 8 inches." },
    { name: "Banana Pudding Cake", price: "50", id: "bpcake", image: "/pbudding.png", desc: " Layers of Vanilla cake filled with fresh bananas and pudding, decorated with buttercream frosting and topped with vanilla wafers. All cakes are 3 layers and 8 inches." },
    { name: "White Chocolate Raspberry", price: "50", id: "whitecoco", image: "/whitecoco.jpg", desc: "Layers of White Chocolate cake, filled with a fresh raspberry compote, topped with a light and fluffy cream cheese buttercream frosting and garnished with fresh raspberries and white chocolate All cakes are 3 layers and 8 inches." },
    { name: "Rum Cake", price: "45", id: "rumcake", image: "/rumcake.jpg", desc: "Fluffy butter and pecan cake infused with rum. All cakes are 3 layers and 8 inches." },
    { name: "Number Cake", price: "0", id: "numbercake", image: "/IMG_0780.jpg", desc: "Perfect for birthday parties just let me know what number! All cakes are 3 layers and 8 inches." },
    { name: "Custom Cake", price: "0", id: "customcake", image: "/AnotherCustomcake.jpg", desc: "Design your own cake! Fill out the description below and I will get back to you to talk about pricing! All cakes are 3 layers and 8 inches." },,
  ],

  Cupcakes: [
    { name: "Chocolate Cupcake", price: "25", id: "vancupcake", image: "/Vccakes.jpg", desc: "Sold by dozen. Light and fluffy cupcakes with strawberry flavor." },
    { name: "Vanilla Cupcake", price: "25", id: "chococupcake", image: "/Vccakes.jpg", desc: "Sold by dozen. Light and fluffy cupcakes with strawberry flavor." },
    { name: "Strawberry Cupcake", price: "30", id: "strawberrycupcake", image: "/strawberryccakes.jpg", desc: "Sold by dozen. Fluffy strawberry cake topped with a light buttercream frosting.." },
    { name: "Lemon Cupcake", price: "30", id: "lemoncupcake", image: "/leemoncupcake.png", desc: "Sold by dozen.  Fluffy lemon cake topped with Lemon Buttercream frosting." },
    { name: "Carrot Cupcake", price: "40", id: "ccake", image: "/carrotccake.jpg", desc: "Sold by dozen. Spiced cupcakes with grated carrots and creamy frosting." },
    { name: "Lemon&Blueberry Cupcake", price: "40", id: "lnbccake", image: "/Lemonblue.jpg", desc: "Sold by dozen. Lemon cake with fresh blueberries, decorated with buttercream frosting and fresh blueberries." },
    { name: "Lemon&Raspberry Cupcake", price: "40", id: "lemonnrccake", image: "/lemonraspccakes.png", desc: "Sold by dozen. Lemon cake filled with a fresh raspberry compote, decorated with buttercream frosting and fresh raspberries" },
    { name: "PB&J Cupcake", price: "40", id: "pbnj", image: "/pbnj.jpg", desc: "Sold by dozen. Vanilla cake topped with a peanut butter cream cheese frosting, with a fresh strawberry jam and garnished with a peanut butter cookie." },
    { name: "Rainbow Cupcake", price: "35", id: "rainbowcupcake", image: "/rainbowccake.jpg", desc: "Sold by dozen. Colorful and fun cupcakes for any celebration." },
    { name: "Red Velvet Cupcake", price: "40", id: "redvelvetcupcake", image: "/RedVel.jpg", desc: "Sold by dozen. Mini versions of the classic red velvet cake." },
    { name: "Number Cupcake", price: "0", id: "numbercupcake", image: "/numbercupcake.jpg", desc: "Perfect for birthday parties just let me know what number! Starts at 75$ minimum" },
    { name: "White Chocolate Raspberry  Cupcake", price: "45", id: "speccuake", image: "/specccake.jpg", desc: "Design your own Cupcakes sold by the dozen! White Chocolate cake, filled with a fresh raspberry compote, topped with a light and fluffy cream cheese buttercream frosting and garnished with fresh raspberries and white chocolate. " }
],

Cheesecakes: [
    { name: "Original Cheesecake", price: "40", id: "originalcheese", image: "/ogcheesec.jpg", desc: "Classic creamy cheesecake with a graham cracker crust." },
    { name: " Original Cheesecake w/Toppings", price: "45", id: "ogwtop", image: "/ogcheesewtop.jpg", desc: "Our original creamy cheesecake with your choice of topping" },
    { name: "Specialty Cheesecakes", price: "50", id: "specialcheesecake", image: "/Speccheese.jpg", desc: "Unique and gourmet cheesecakes for special occasions." },
  ],
  Pies: [
    { name: "Apple Pie", price: "35", id: "applepie", image: "/applepie.jpg", desc: "Fresh cut apples, baked in sweet spices in a flaky crust." },
    { name: "Lemon Meringue Pie", price: "35", id: "lemonpie", image: "/lemonmerin.png", desc: "Zesty lemon pie topped with a light meringue." },
    { name: "Sweet Potato Pie", price: "35", id: "sweetpotatopie", image: "/sweetpoppie.png", desc: " Roasted sweet potatoes, cinnamon, nutmeg and other spices. Just like your grandma used to make, this Sweet Potato Pie is the one you want on your table for all holidays and special occasions!" },
  ],
  Brownies: [
    { name: "Traditional Brownies", price: "30", id: "traditionalbrownie", image: "/tradbrown.jpg", desc: "Rich and fudgy traditional brownies." },
    { name: "Turtle Brownie", price: "40", id: "turtlebrownie", image: "/turtlebrown.jpg", desc: "Our Traditional Brownies topped with caramel, rich chocolate and toasted pecans." },
    { name: "Gourmet Brownies", price: "50", id: "grownie", image: "/bwithtop.png", desc: "Premium brownies with decadent toppings." },
  ],
  Catering: [
    { name: " Custom Catering", price: "0", id: "cateringrequest", image: "/cateringtab.png", desc: "At B's sweets and eats we offer top tier catering! Please fill out the descrpition box below and inform me what you want." },

  ],
};

export default menuItems;
