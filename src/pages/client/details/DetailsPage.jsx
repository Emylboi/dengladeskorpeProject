import { useLocation } from "react-router-dom";
import Hero from "../../../components/commonComponents/Hero/Hero";
import { useState } from "react";
import styles from "./detailsPage.module.css";
import TitleComp from "../../../components/commonComponents/TitleComp/TitleComp";
import { useLocalStorage } from "@uidotdev/usehooks";

const DetailsPage = () => {
    const { state: dish } = useLocation();
    const [size, setSize] = useState("normal");
    const [cart, setCart] = useLocalStorage("cart", [])

    if (!dish) {
        return <div>Error: No data found for this dish.</div>;
    }

    /* Checks if a dish has both a normal and family size */
    const hasMultipleSizes = dish.price.normal && dish.price.family;
    
    const addToCart = () => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === dish.id && item.size === size);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === dish.id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...dish, size, quantity: 1 }];
            }
        });
    };

    return(
        <section>
            <Hero title={dish.title}/>
            <div>
                <img src={dish.image} className={styles.dishImage}/>
                <div className={styles.dishInfo}>
                    <p className={styles.dishTitle}>{dish.title}</p>
                    {/* Puts the ingredients on their own line by mapping a <p> */}
                    {dish.ingredients.map((ingredient, index) => (
                        <p key={index} className={styles.dishIngredients}>{ingredient}</p>
                     ))}
            </div>
                
                {hasMultipleSizes && (
                    <>
                    <TitleComp title={"Vælg størrelse"} />
                        <div className={styles.center}>
                            <select value={size} onChange={(e) => setSize(e.target.value)} className={styles.dishSize}>
                                <option value="normal">Normal</option>
                                <option value="family">Family</option>
                            </select>
                        </div>
                    </>
                )}
                    
                    <h1 className={styles.dishPriceText}>Pris</h1>
                    <p className={styles.dishPrice}>{dish.price[size]},-</p>

                     <div className={styles.center}>
                        <button className={styles.dishToCart} onClick={addToCart}>
                            Tilføj {dish.title} til kurven
                        </button>
                     </div>
            </div>
        </section>
    )
}

export default DetailsPage;