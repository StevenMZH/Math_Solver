import KatexRenderer from "../global/katexRenderer";

export function FormulaSheet({ formulas }) {
    return (
        <div className="panelContainer sheet-container">
            <div className="panel-header">
                <label>Formulas Sheet</label>
            </div>
            <div className="sheet">
                {formulas && formulas.length > 0 ? (
                    formulas.map((formula, index) => (
                        <KatexRenderer
                            key={index}
                            className="formula-label"
                            expression={formula}
                        />
                    ))
                ) : (
                    <p>No formulas available.</p>
                )}
            </div>

            <style>{`
                .sheet-container {
                    width: 60vw;
                }
                .sheet {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 10px;
                    overflow: auto;
                }
                .formula-label {
                    border-radius: 5px;
                    font-size: 12px;
                    color: var(--text);
                    text-align: left;
                }
            `}</style>
        </div>
    );
}

export default FormulaSheet;