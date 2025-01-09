import 'katex/dist/katex.min.css';
import katex from 'katex';

export function FormulaSheet({ formulas }) {
    return (
        <div className="panelContainer sheet-container">
            <div className="panel-header">
                <label>Formulas Sheet</label>
            </div>
            <div className="sheet">
                {formulas && formulas.length > 0 ? (
                    formulas.map((formula, index) => (
                        <div
                            key={index}
                            className="formula-label"
                            dangerouslySetInnerHTML={{
                                __html: katex.renderToString(formula, {
                                    throwOnError: false,
                                }),
                            }}
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