CREATE OR REPLACE FUNCTION get_user_total_spending()
RETURNS TABLE (
    "userId" UUID,
    "userName" TEXT,
    "totalAmount" DECIMAL
)
LANGUAGE SQL
AS $$
    SELECT 
        u.id AS "userId",
        CONCAT(u.first_name,' ',u.last_name) AS "userName",
        COALESCE(SUM(p.Amount),0) AS "totalAmount"
    FROM users as u
    LEFT JOIN orders as o
        ON o.user_id = u.id
    LEFT JOIN payments as p
        ON p.order_id = o.id
        AND p.payment_status ='paid'
    GROUP BY
        u.id,
        u.first_name,
        u.last_name
    ORDER BY
        "totalAmount" DESC;
    $$;


CREATE OR REPLACE FUNCTION get_user_order_counts()
RETURNS TABLE (
    "userId" UUID,
    "userName" TEXT,
    "totalOrders" BIGINT
)
LANGUAGE SQL
AS $$
    SELECT 
        u.id AS "userId",
        CONCAT(u.first_name,' ', u.last_name) AS  "userName",
        COUNT(o.id) AS "totalOrders"
    FROM users as u
    LEFT JOIN orders AS o
        ON o.user_id = u.id
    GROUP BY
        u.id,
        u.first_name,
        u.last_name
    ORDER BY
        "totalOrders" DESC,
        "userName" ASC;
    $$;

CREATE OR REPLACE FUNCTION get_user_payment_failure_status()
RETURNS TABLE(
    "userId" UUID,
    "userName" TEXT,
    "totalSucceeded" BIGINT,
    "totalFailed" BIGINT,
    "ratio" DECIMAL
)
LANGUAGE SQL
AS $$
    SELECT 
    u.id AS "userId",
    CONCAT(u.first_name,' ', u.last_name) AS  "userName",

    COUNT(p.id) FILTER (
        WHERE p.payment_status ='paid'
    ) AS "totalSucceeded",

    COUNT(p.id) FILTER (
        WHERE p.payment_status ='failed'
    ) AS "totalFailed",

    COALESCE(
        (
            COUNT(p.id) FILTER(
                WHERE p.payment_status = 'failed'
            )
        ):: DECIMAL
        /
        NULLIF(
            COUNT(p.id) FILTER(
                WHERE p.payment_status in ('paid','failed')
            ),
            0
        ),
        0
    ) AS "ratio"

    FROM users as u
    LEFT JOIN orders as o
        ON  o.user_id = u.id
    LEFT JOIN payments as p
        ON p.order_id = o.id
    
    GROUP BY
        u.id,
        u.first_name,
        u.last_name
    ORDER BY
        "ratio" DESC;
        $$;