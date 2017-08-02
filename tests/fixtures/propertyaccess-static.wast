 (export "test" (func $test))
 (export "memory" (memory $0))
 (func $test (type $v)
  (drop
   (get_global $A.a)
  )
  (set_global $A.a
   (i32.const 1)
  )
 )
