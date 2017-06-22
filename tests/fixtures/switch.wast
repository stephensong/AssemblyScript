 (export "test1" (func $test1))
 (export "test2" (func $test2))
 (func $test1 (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (block $break$1.1
   (block $case3$1.1
    (block $default$1.1
     (block $case1$1.1
      (block $case0$1.1
       (set_local $1
        (get_local $0)
       )
       (br_table $case0$1.1 $case1$1.1 $case3$1.1 $default$1.1
        (select
         (i32.const 0)
         (select
          (i32.const 1)
          (select
           (i32.const 3)
           (i32.const -1)
           (i32.eq
            (get_local $1)
            (i32.const 2)
           )
          )
          (i32.eq
           (get_local $1)
           (i32.const 1)
          )
         )
         (i32.eq
          (get_local $1)
          (i32.const 3)
         )
        )
       )
      )
      (return
       (i32.const 3)
      )
     )
     (return
      (i32.const 1)
     )
    )
    (block $break$1.2
     (block $case3$1.2
      (block $case2$1.2
       (block $case1$1.2
        (block $case0$1.2
         (set_local $2
          (get_local $0)
         )
         (br_table $case0$1.2 $case1$1.2 $case2$1.2 $case3$1.2 $break$1.2
          (select
           (i32.const 0)
           (select
            (i32.const 1)
            (select
             (i32.const 2)
             (select
              (i32.const 3)
              (i32.const -1)
              (i32.eq
               (get_local $2)
               (i32.const 6)
              )
             )
             (i32.eq
              (get_local $2)
              (i32.const 5)
             )
            )
            (i32.eq
             (get_local $2)
             (i32.const 4)
            )
           )
           (i32.eq
            (get_local $2)
            (i32.const 0)
           )
          )
         )
        )
        (br $break$1.2)
       )
       (return
        (i32.const 4)
       )
      )
     )
     (return
      (i32.const 56)
     )
    )
    (return
     (i32.const 0)
    )
   )
   (return
    (i32.const 2)
   )
  )
 )
 (func $test2 (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (block $break$1.1
   (block $case2$1.1
    (block $default$1.1
     (block $case0$1.1
      (set_local $1
       (get_local $0)
      )
      (br_table $case0$1.1 $case2$1.1 $default$1.1
       (select
        (i32.const 0)
        (select
         (i32.const 2)
         (i32.const -1)
         (i32.eq
          (get_local $1)
          (i32.const 2)
         )
        )
        (i32.eq
         (get_local $1)
         (i32.const 1)
        )
       )
      )
     )
     (return
      (i32.const 1)
     )
    )
   )
   (set_local $0
    (i32.const 2)
   )
  )
  (return
   (get_local $0)
  )
 )
