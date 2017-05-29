(module
 (type $i (func (result i32)))
 (type $iii (func (param i32 i32) (result i32)))
 (type $III (func (param i64 i64) (result i64)))
 (type $ii (func (param i32) (result i32)))
 (type $II (func (param i64) (result i64)))
 (type $FF (func (param f64) (result f64)))
 (type $ff (func (param f32) (result f32)))
 (type $FFF (func (param f64 f64) (result f64)))
 (type $fff (func (param f32 f32) (result f32)))
 (type $fi (func (param f32) (result i32)))
 (type $FI (func (param f64) (result i64)))
 (type $if (func (param i32) (result f32)))
 (type $IF (func (param i64) (result f64)))
 (memory $0 256)
 (export "memory" (memory $0))
 (export "testSwitch" (func $testSwitch))
 (export "testSwitch2" (func $testSwitch2))
 (func $testSwitch (type $ii) (param $0 i32) (result i32)
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
 (func $testSwitch2 (type $ii) (param $0 i32) (result i32)
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
)
